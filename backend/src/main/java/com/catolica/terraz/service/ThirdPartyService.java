package com.catolica.terraz.service;

import com.catolica.terraz.dto.FactorTypeDTO;
import com.catolica.terraz.dto.ThirdPartyDTO;
import com.catolica.terraz.model.ThirdParty;
import com.catolica.terraz.repository.ThirdPartyRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ThirdPartyService {
  private final ThirdPartyRepository thirdPartyRepository;
  private final ModelMapper modelMapper;

  public ThirdPartyDTO saveThirdParty(ThirdPartyDTO thirdPartyDTO) {
    ThirdParty newThirdParty = modelMapper.map(thirdPartyDTO, ThirdParty.class);
    thirdPartyRepository.save(newThirdParty);
    return modelMapper.map(newThirdParty, ThirdPartyDTO.class);
  }

  public List<ThirdPartyDTO> getAllThirdParty() {
    return thirdPartyRepository.findAllWithFactorType().stream()
        .map(thirdParty -> ThirdPartyDTO.builder()
                .id(thirdParty.getId())
                .name(thirdParty.getName())
                .cnpj(thirdParty.getCnpj())
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
}
