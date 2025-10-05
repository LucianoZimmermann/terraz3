package com.catolica.terraz.service;

import com.catolica.terraz.dto.FactorTypeDTO;
import com.catolica.terraz.repository.FactorTypeRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FactorTypeService {

  private final FactorTypeRepository factorTypeRepository;
  private final ModelMapper modelMapper;

  public List<FactorTypeDTO> getAllFactorTypes() {
    return factorTypeRepository.findAll().stream()
        .map(types -> modelMapper.map(types, FactorTypeDTO.class))
        .collect(Collectors.toList());
  }
}
