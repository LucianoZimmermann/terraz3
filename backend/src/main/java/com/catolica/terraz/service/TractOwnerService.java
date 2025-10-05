package com.catolica.terraz.service;

import com.catolica.terraz.dto.TractOwnerDTO;
import com.catolica.terraz.model.TractOwner;
import com.catolica.terraz.repository.TractOwnerRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TractOwnerService {
  private final TractOwnerRepository tractOwnerRepository;
  private final ModelMapper modelMapper;

  public TractOwnerDTO save(TractOwnerDTO tractOwnerDTO) {
    TractOwner tractOwner = modelMapper.map(tractOwnerDTO, TractOwner.class);
    tractOwner = tractOwnerRepository.save(tractOwner);
    return modelMapper.map(tractOwner, TractOwnerDTO.class);
  }

  public List<TractOwnerDTO> getAllTractOwners() {
    return tractOwnerRepository.findAll().stream()
        .map(owner -> modelMapper.map(owner, TractOwnerDTO.class))
        .collect(Collectors.toList());
  }

  public Optional<TractOwnerDTO> getTractOwnerById(Long id) {
    return tractOwnerRepository
        .findById(id)
        .map(owner -> modelMapper.map(owner, TractOwnerDTO.class));
  }
}
