package com.catolica.terraz.service;

import com.catolica.terraz.dto.FactorDTO;
import com.catolica.terraz.dto.TractDTO;
import com.catolica.terraz.dto.quote.CreatedQuoteDTO;
import com.catolica.terraz.dto.quote.RequestQuoteDTO;
import com.catolica.terraz.dto.quote.ResponseQuoteDTO;
import com.catolica.terraz.dto.quote.UpdateQuoteDTO;
import com.catolica.terraz.enums.EntityType;
import com.catolica.terraz.enums.FactorTypeEnum;
import com.catolica.terraz.exception.ExceptionHelper;
import com.catolica.terraz.model.*;
import com.catolica.terraz.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuoteService {

    private final QuoteRepository quoteRepository;
    private final TractRepository tractRepository;
    private final ThirdPartyRepository thirdPartyRepository;
    private final FactorRepository factorRepository;
    private final FactorTypeRepository factorTypeRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public CreatedQuoteDTO saveQuote(RequestQuoteDTO quoteDTO) {

        Quote quote = Quote.builder().factorList(new ArrayList<>()).totalFactorsPrice(BigDecimal.ZERO).lotCount(BigDecimal.ZERO).pricePerLot(BigDecimal.ZERO).totalProfit(BigDecimal.ZERO).totalLiquidProfit(BigDecimal.ZERO).markup(BigDecimal.ZERO).createDate(LocalDateTime.now()).build();

        List<Factor> factors = List.of(FactorTypeEnum.HYDRO_SANITARY_SYSTEM, FactorTypeEnum.RAINWATER_DRAINAGE_SYSTEM, FactorTypeEnum.PAVING, FactorTypeEnum.ELECTRICAL_NETWORK, FactorTypeEnum.EARTHWORKS).stream().map(ftEnum -> {
            FactorType factorType = factorTypeRepository.findByFactorTypeEnum(ftEnum).orElseThrow(() -> new EntityNotFoundException("Tipo de fator não cadastrado"));

            return Factor.builder().factorType(factorType).price(BigDecimal.ZERO).quote(quote).build();
        }).toList();

        quote.getFactorList().addAll(factors);

        Quote savedQuote = quoteRepository.saveAndFlush(quote);

        factors.forEach(factorRepository::save);

        return CreatedQuoteDTO.builder().id(savedQuote.getId()).build();
    }

    @Transactional
    public ResponseQuoteDTO updateQuote(Long id, UpdateQuoteDTO quoteDTO) {

        Tract tract = tractRepository.findById(quoteDTO.getTractId()).orElseThrow(() -> ExceptionHelper.notFoundException(EntityType.TRACT, quoteDTO.getTractId()));

        Quote quote = quoteRepository.findById(id).orElseThrow(() -> ExceptionHelper.notFoundException(EntityType.QUOTE, quoteDTO.getId()));

        for (FactorDTO f : quoteDTO.getFactors()) {

            Factor factor = factorRepository.findByQuoteIdAndFactorTypeId(id, f.getFactorTypeId());

            FactorType factorType = factorTypeRepository.findById(f.getFactorTypeId()).orElseThrow(() -> ExceptionHelper.notFoundException(EntityType.FACTOR_TYPE, f.getFactorTypeId()));

            ThirdParty thirdParty = null;
            if (f.getThirdPartyId() != null) {
                thirdParty = thirdPartyRepository.findById(f.getThirdPartyId()).orElseThrow(() -> ExceptionHelper.notFoundException(EntityType.THIRD_PARTY, f.getThirdPartyId()));
            }

            factor.setFactorType(factorType);
            factor.setPrice(f.getPrice());
            factor.setThirdParty(thirdParty);
            factorRepository.save(factor);
        }

        BigDecimal lotCount = quoteDTO.getLotCount() != null ? quoteDTO.getLotCount() : BigDecimal.ZERO;

        BigDecimal tractOwnerLotCount = quoteDTO.getTractOwnerLotCount() != null ? quoteDTO.getTractOwnerLotCount() : BigDecimal.ZERO;

        BigDecimal terrazLotCount = lotCount.subtract(tractOwnerLotCount);

        BigDecimal pricePerLot = quoteDTO.getPricePerLot() != null ? quoteDTO.getPricePerLot() : BigDecimal.ZERO;

        BigDecimal totalQuoteProfit = pricePerLot.multiply(lotCount);

        BigDecimal totalFactorsPrice = quoteDTO.getTotalFactorsPrice() != null ? quoteDTO.getTotalFactorsPrice() : BigDecimal.ZERO;

        BigDecimal liquidProfitPerLot = BigDecimal.ZERO;
        BigDecimal markup = BigDecimal.ZERO;

        if (lotCount.compareTo(BigDecimal.ZERO) > 0) {
            liquidProfitPerLot = totalQuoteProfit.subtract(totalFactorsPrice).divide(lotCount, 2, RoundingMode.HALF_UP);
        }

        if (totalFactorsPrice.compareTo(BigDecimal.ZERO) > 0) {
            markup = totalQuoteProfit.divide(totalFactorsPrice, 4, RoundingMode.HALF_UP);
        }

        BigDecimal totalProfit = terrazLotCount.multiply(pricePerLot);
        BigDecimal totalLiquidProfit = terrazLotCount.multiply(liquidProfitPerLot);

        quote.setTract(tract);
        quote.setTotalFactorsPrice(totalFactorsPrice);
        quote.setLotCount(lotCount);
        quote.setTractOwnerLotCount(tractOwnerLotCount);
        quote.setTotalProfit(totalProfit);
        quote.setTotalLiquidProfit(totalLiquidProfit);
        quote.setMarkup(markup);
        quote.setPricePerLot(pricePerLot);

        Quote savedQuote = quoteRepository.saveAndFlush(quote);

        TractDTO tractDTO = modelMapper.map(savedQuote.getTract(), TractDTO.class);

        List<FactorDTO> factorDTOs = savedQuote.getFactorList().stream().map(f -> FactorDTO.builder().id(f.getId()).factorTypeId(f.getFactorType().getId()).thirdPartyId(f.getThirdParty() != null ? f.getThirdParty().getId() : null).quoteId(quote.getId()).price(f.getPrice()).build()).toList();

        return ResponseQuoteDTO.builder().id(savedQuote.getId()).tract(tractDTO).factors(factorDTOs).lotCount(savedQuote.getLotCount()).tractOwnerLotCount(savedQuote.getTractOwnerLotCount()).pricePerLot(savedQuote.getPricePerLot()).totalFactorsPrice(savedQuote.getTotalFactorsPrice()).totalProfit(savedQuote.getTotalProfit()).totalLiquidProfit(savedQuote.getTotalLiquidProfit()).markup(savedQuote.getMarkup()).createDate(savedQuote.getCreateDate()).build();
    }


    public List<ResponseQuoteDTO> getAllQuotes() {
        return quoteRepository.findAll().stream().map(quote -> modelMapper.map(quote, ResponseQuoteDTO.class)).collect(Collectors.toList());
    }

    public Optional<ResponseQuoteDTO> getQuoteById(Long id) {
        return quoteRepository.findById(id).map(quote -> {
            ResponseQuoteDTO dto = modelMapper.map(quote, ResponseQuoteDTO.class);
            List<Factor> factors = factorRepository.findByQuoteId(id);
            List<FactorDTO> factorDTOs = factors.stream().map(f -> modelMapper.map(f, FactorDTO.class)).toList();
            dto.setFactors(factorDTOs);
            return dto;
        });
    }

    public List<ResponseQuoteDTO> getQuotesByOwnerId(Long id) {
        return quoteRepository.findAll().stream().filter(quote -> quote.getTract().getTractOwner() != null && id.equals(quote.getTract().getTractOwner().getId())).map(quote -> modelMapper.map(quote, ResponseQuoteDTO.class)).collect(Collectors.toList());
    }

    public void deleteQuote(Long id) {
        quoteRepository.deleteById(id);
    }
}
