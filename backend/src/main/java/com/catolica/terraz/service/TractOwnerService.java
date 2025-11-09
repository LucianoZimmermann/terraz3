package com.catolica.terraz.service;

import com.catolica.terraz.dto.TractOwnerDTO;
import com.catolica.terraz.dto.TractOwnerDeletionConflictDTO;
import com.catolica.terraz.model.TractOwner;
import com.catolica.terraz.repository.TractOwnerRepository;
import com.catolica.terraz.repository.TractRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TractOwnerService {
  private final TractOwnerRepository tractOwnerRepository;
  private final TractRepository tractRepository;
  private final ModelMapper modelMapper;

  public TractOwnerDTO save(TractOwnerDTO dto) {
    TractOwner e = modelMapper.map(dto, TractOwner.class);
    e = tractOwnerRepository.save(e);
    return modelMapper.map(e, TractOwnerDTO.class);
  }

  public List<TractOwnerDTO> getAllTractOwners() {
    return tractOwnerRepository.findAll().stream()
            .map(o -> modelMapper.map(o, TractOwnerDTO.class))
            .toList();
  }

  public Optional<TractOwnerDTO> getTractOwnerById(Long id) {
    return tractOwnerRepository.findById(id)
            .map(o -> modelMapper.map(o, TractOwnerDTO.class));
  }

  @Transactional
  public Optional<TractOwnerDTO> update(Long id, TractOwnerDTO dto) {
    return tractOwnerRepository.findById(id).map(existing -> {
      modelMapper.map(dto, existing);
      existing.setId(id);
      TractOwner saved = tractOwnerRepository.save(existing);
      return modelMapper.map(saved, TractOwnerDTO.class);
    });
  }

  @Transactional
  public Optional<TractOwnerDeletionConflictDTO> deleteOrReport(Long id, boolean cascade) {
    TractOwner owner = tractOwnerRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("TractOwner " + id + " não encontrado"));

    long cnt = tractRepository.countByTractOwnerId(id);
    if (cnt > 0 && !cascade) {
      List<Long> ids = tractRepository.findIdsByTractOwnerId(id);
      return Optional.of(new TractOwnerDeletionConflictDTO(id, cnt, ids));
    }

    if (cnt > 0 && cascade) {
      tractRepository.deleteByTractOwnerId(id);
    }
    tractOwnerRepository.delete(owner);
    return Optional.empty();
  }
}
