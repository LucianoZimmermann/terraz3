package com.catolica.terraz.service;

import com.catolica.terraz.dto.FactorTypeDTO;
import com.catolica.terraz.dto.ThirdPartyDTO;
import com.catolica.terraz.dto.thirdparty.CreateThirdPartyDTO;
import com.catolica.terraz.dto.thirdparty.UpdateThirdPartyDTO;
import com.catolica.terraz.enums.EntityType;
import com.catolica.terraz.exception.ExceptionHelper;
import com.catolica.terraz.model.FactorType;
import com.catolica.terraz.model.ThirdParty;
import com.catolica.terraz.repository.FactorRepository;
import com.catolica.terraz.repository.FactorTypeRepository;
import com.catolica.terraz.repository.QuoteRepository;
import com.catolica.terraz.repository.ThirdPartyRepository;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ThirdPartyService {
  private final ThirdPartyRepository thirdPartyRepository;
  private final FactorRepository factorRepository;
  private final FactorTypeRepository factorTypeRepository;
  private final ModelMapper modelMapper;

  public ThirdPartyDTO saveThirdParty(CreateThirdPartyDTO thirdPartyDTO) {
    FactorType factorType = factorTypeRepository.findById(thirdPartyDTO.getFactorTypeId())
            .orElseThrow(() -> ExceptionHelper.notFoundException(EntityType.FACTOR_TYPE, thirdPartyDTO.getFactorTypeId()));
    ThirdParty newThirdParty = ThirdParty.builder()
            .cnpj(thirdPartyDTO.getCnpj())
            .name(thirdPartyDTO.getName())
            .phone(thirdPartyDTO.getPhone())
            .contactName(thirdPartyDTO.getContactName())
            .factorType(factorType)
            .build();
    thirdPartyRepository.save(newThirdParty);
    return modelMapper.map(newThirdParty, ThirdPartyDTO.class);
  }

  public List<ThirdPartyDTO> getAllThirdParty() {
    return thirdPartyRepository.findAllWithFactorType().stream()
        .map(thirdParty -> ThirdPartyDTO.builder()
                .id(thirdParty.getId())
                .name(thirdParty.getName())
                .cnpj(thirdParty.getCnpj())
                .phone(thirdParty.getPhone())
                .contactName(thirdParty.getContactName())
                .factorType(FactorTypeDTO.builder().id(thirdParty.getId()).factorTypeEnum(thirdParty.getFactorType().getFactorTypeEnum()).build())
                .build()
        ).collect(Collectors.toList());
  }

  public ThirdPartyDTO getThirdPartyById(Long id) {
    ThirdParty thirdParty =
        thirdPartyRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Third party not found"));
    return modelMapper.map(thirdParty, ThirdPartyDTO.class);
  }

  @Transactional
  public ThirdPartyDTO updateThirdParty(UpdateThirdPartyDTO thirdPartyDTO) {
    if (thirdPartyDTO.getId() == null) {
      throw new IllegalArgumentException("ThirdParty id must not be null");
    }

    ThirdParty existing = thirdPartyRepository.findById(thirdPartyDTO.getId())
            .orElseThrow(() -> new RuntimeException("Third party not found: " + thirdPartyDTO.getId()));

    if (thirdPartyDTO.getName() != null) {
      existing.setName(thirdPartyDTO.getName());
    }

    if (thirdPartyDTO.getCnpj() != null) {
      existing.setCnpj(thirdPartyDTO.getCnpj());
    }

    if (thirdPartyDTO.getPhone() != null) {
      existing.setPhone(thirdPartyDTO.getPhone());
    }

    if (thirdPartyDTO.getFactorTypeId() != null) {
      Long newId = thirdPartyDTO.getFactorTypeId();
      Long cur = existing.getFactorType() != null ? existing.getFactorType().getId() : null;
      if (!java.util.Objects.equals(cur, newId)) {
        existing.setFactorType(factorTypeRepository.getReferenceById(newId));
      }
    }

    ThirdParty saved = thirdPartyRepository.save(existing);
    return modelMapper.map(saved, ThirdPartyDTO.class);
  }

  @Transactional
  public void deleteThirdParty(Long id) {
    if (!thirdPartyRepository.existsById(id)) {
      throw ExceptionHelper.notFoundException(EntityType.THIRD_PARTY, id);
    }

    factorRepository.clearThirdPartyFromFactors(id);

    thirdPartyRepository.deleteById(id);
  }
}
