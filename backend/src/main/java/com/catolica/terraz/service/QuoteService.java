package com.catolica.terraz.service;

import com.catolica.terraz.dto.FactorDTO;
import com.catolica.terraz.dto.quote.CreatedQuoteDTO;
import com.catolica.terraz.dto.quote.RequestQuoteDTO;
import com.catolica.terraz.dto.quote.ResponseQuoteDTO;
import com.catolica.terraz.dto.quote.UpdateQuoteDTO;
import com.catolica.terraz.enums.EntityType;
import com.catolica.terraz.enums.FeasibilityEnum;
import com.catolica.terraz.exception.ExceptionHelper;
import com.catolica.terraz.model.*;
import com.catolica.terraz.repository.*;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

@Service
@AllArgsConstructor
public class QuoteService {

    private final QuoteRepository quoteRepository;
    private final TractRepository tractRepository;
    private final ThirdPartyRepository thirdPartyRepository;
    private final FactorTypeRepository factorTypeRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public CreatedQuoteDTO saveQuote(RequestQuoteDTO quoteDTO) {

        Quote quote =
                Quote.builder()
                        .factorList(new ArrayList<>())
                        .totalFactorsPrice(BigDecimal.ZERO)
                        .lotCount(BigDecimal.ZERO)
                        .createDate(LocalDateTime.now())
                        .build();

        Quote savedQuote = quoteRepository.saveAndFlush(quote);

        return CreatedQuoteDTO.builder().id(savedQuote.getId()).build();
    }

    private FeasibilityEnum classifyProfitability(BigDecimal marginPercent) {
        if (marginPercent == null) {
            marginPercent = BigDecimal.ZERO;
        }

        if (marginPercent.compareTo(BigDecimal.ZERO) < 0) {
            return FeasibilityEnum.IMPOSSIBLE;
        } else if (marginPercent.compareTo(new BigDecimal("0.10")) < 0) {
            return FeasibilityEnum.LOW_PROFITABILITY;
        } else if (marginPercent.compareTo(new BigDecimal("0.20")) < 0) {
            return FeasibilityEnum.MODERATE;
        } else if (marginPercent.compareTo(new BigDecimal("0.30")) < 0) {
            return FeasibilityEnum.PROFITABLE;
        } else {
            return FeasibilityEnum.VERY_PROFITABLE;
        }
    }

    @Transactional
    public ResponseQuoteDTO updateQuote(UpdateQuoteDTO quoteDTO) {

        Tract tract = tractRepository.findById(quoteDTO.getTractId())
                .orElseThrow(() ->
                        ExceptionHelper.notFoundException(EntityType.TRACT, quoteDTO.getTractId())
                );

        BigDecimal priceFactor = tract.getNeighborhood().getPriceFactor();

        Quote quote = quoteRepository.findById(quoteDTO.getId())
                .orElseThrow(() ->
                        ExceptionHelper.notFoundException(EntityType.QUOTE, quoteDTO.getId())
                );

        List<Factor> existingFactors = quote.getFactorList();
        existingFactors.clear();

        for (FactorDTO f : quoteDTO.getFactors()) {
            FactorType factorType = factorTypeRepository.findById(f.getFactorTypeId())
                    .orElseThrow(() ->
                            ExceptionHelper.notFoundException(EntityType.FACTOR_TYPE, f.getFactorTypeId())
                    );

            ThirdParty thirdParty = null;
            if (f.getThirdPartyId() != null) {
                thirdParty = thirdPartyRepository.findById(f.getThirdPartyId())
                        .orElseThrow(() ->
                                ExceptionHelper.notFoundException(EntityType.THIRD_PARTY, f.getThirdPartyId())
                        );
            }

            Factor factor = new Factor();
            factor.setFactorType(factorType);
            factor.setPrice(f.getPrice());
            factor.setQuote(quote);
            factor.setThirdParty(thirdParty);

            existingFactors.add(factor);
        }

        BigDecimal lotCount = quoteDTO.getLotCount() != null
                ? quoteDTO.getLotCount()
                : BigDecimal.ZERO;

        BigDecimal totalFactorsPrice = quoteDTO.getTotalFactorsPrice();

        BigDecimal costPerLot = BigDecimal.ZERO;
        if (lotCount.compareTo(BigDecimal.ZERO) > 0) {
            costPerLot = totalFactorsPrice.divide(lotCount, 2, RoundingMode.HALF_UP);
        }

        BigDecimal pricePerLot = BigDecimal.ZERO;
        if (lotCount.compareTo(BigDecimal.ZERO) > 0) {
            pricePerLot = priceFactor
                    .multiply(costPerLot)
                    .setScale(2, RoundingMode.HALF_UP);
        }

        BigDecimal totalRevenue = pricePerLot.multiply(lotCount);
        BigDecimal totalProfit = totalRevenue.subtract(totalFactorsPrice);

        BigDecimal marginPercent = BigDecimal.ZERO;
        if (totalRevenue.compareTo(BigDecimal.ZERO) > 0) {
            marginPercent = totalProfit.divide(totalRevenue, 4, RoundingMode.HALF_UP);
        }

        FeasibilityEnum feasibility = classifyProfitability(marginPercent);

        quote.setTract(tract);
        quote.setTotalFactorsPrice(totalFactorsPrice);
        quote.setLotCount(lotCount);
        quote.setPricePerLot(pricePerLot);
        quote.setFeasibility(feasibility);

        Quote savedQuote = quoteRepository.saveAndFlush(quote);

        return ResponseQuoteDTO.builder()
                .id(savedQuote.getId())
                .build();
    }


    public List<ResponseQuoteDTO> getAllQuotes() {
        return quoteRepository.findAll().stream()
                .map(quote -> modelMapper.map(quote, ResponseQuoteDTO.class))
                .collect(Collectors.toList());
    }

    public Optional<RequestQuoteDTO> getQuoteById(Long id) {
        return quoteRepository.findById(id).map(quote -> modelMapper.map(quote, RequestQuoteDTO.class));
    }

    public List<RequestQuoteDTO> getQuotesByOwnerId(Long id) {
        return quoteRepository.findAll().stream()
                .filter(
                        quote ->
                                quote.getTract().getTractOwner() != null
                                        && id.equals(quote.getTract().getTractOwner().getId()))
                .map(quote -> modelMapper.map(quote, RequestQuoteDTO.class))
                .collect(Collectors.toList());
    }

    public void deleteQuote(Long id){
        quoteRepository.deleteById(id);
    }
}
