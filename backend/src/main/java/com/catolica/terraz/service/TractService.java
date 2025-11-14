package com.catolica.terraz.service;

import com.catolica.terraz.dto.TractDTO;
import com.catolica.terraz.enums.EntityType;
import com.catolica.terraz.exception.ExceptionHelper;
import com.catolica.terraz.model.Address;
import com.catolica.terraz.model.Tract;
import com.catolica.terraz.repository.AddressRepository;
import com.catolica.terraz.repository.TractOwnerRepository;
import com.catolica.terraz.repository.TractRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class TractService {

  private final TractRepository tractRepository;
  private final AddressRepository addressRepository;
  private final TractOwnerRepository tractOwnerRepository;
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

  @Transactional
  public TractDTO updateTract(TractDTO dto) {
    Tract existing = tractRepository.findById(dto.getId())
            .orElseThrow(() -> ExceptionHelper.notFoundException(EntityType.TRACT, dto.getId()));

    if (dto.getSquareMeters() != null) {
      existing.setSquareMeters(dto.getSquareMeters());
    }

    if (dto.getAddress() != null && dto.getAddress().getId() != null) {
      Long newId = dto.getAddress().getId();
      Long cur = existing.getAddress() != null ? existing.getAddress().getId() : null;
      if (!java.util.Objects.equals(cur, newId)) {
        existing.setAddress(addressRepository.getReferenceById(newId));
      }
    }

    if (dto.getTractOwner() != null && dto.getTractOwner().getId() != null) {
      Long newId = dto.getTractOwner().getId();
      Long cur = existing.getTractOwner() != null ? existing.getTractOwner().getId() : null;
      if (!java.util.Objects.equals(cur, newId)) {
        existing.setTractOwner(tractOwnerRepository.getReferenceById(newId));
      }
    }

    Tract saved = tractRepository.save(existing);
    return modelMapper.map(saved, TractDTO.class);
  }
}
