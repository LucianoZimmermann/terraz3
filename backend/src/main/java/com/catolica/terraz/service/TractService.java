package com.catolica.terraz.service;

import com.catolica.terraz.dto.TractDTO;
import com.catolica.terraz.model.Tract;
import com.catolica.terraz.repository.TractRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TractService {

  private final TractRepository tractRepository;
  private final ModelMapper modelMapper;

  public TractDTO saveTract(TractDTO tractDTO) {
    Tract tract = modelMapper.map(tractDTO, Tract.class);
    tractRepository.save(tract);
    return modelMapper.map(tract, TractDTO.class);
  }

  public List<TractDTO> getAllTracts() {
    return tractRepository.findAll().stream()
        .map(tract -> modelMapper.map(tract, TractDTO.class))
        .collect(Collectors.toList());
  }
}
