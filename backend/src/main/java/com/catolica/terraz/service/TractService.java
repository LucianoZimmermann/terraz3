package com.catolica.terraz.service;

import com.catolica.terraz.dto.TractDTO;
import com.catolica.terraz.dto.tract.TractCreateDTO;
import com.catolica.terraz.enums.EntityType;
import com.catolica.terraz.exception.ExceptionHelper;
import com.catolica.terraz.model.Neighborhood;
import com.catolica.terraz.model.Tract;
import com.catolica.terraz.model.TractOwner;
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
  private final TractOwnerRepository tractOwnerRepository;
  private final ModelMapper modelMapper;

  public TractDTO saveTract(TractCreateDTO dto) {
    Tract tract = new Tract();
    tract.setSquareMeters(dto.getSquareMeters());
    tract.setStreet(dto.getStreet());
    tract.setNumber(dto.getNumber());
    tract.setCity(dto.getCity());
    tract.setState(dto.getState());
    tract.setCep(dto.getCep());

    if (dto.getTractOwnerId() != null) {
      TractOwner owner = new TractOwner();
      owner.setId(dto.getTractOwnerId());
      tract.setTractOwner(owner);
    }

    Neighborhood neighborhood = new Neighborhood();
    neighborhood.setId(dto.getNeighborhoodId());
    tract.setNeighborhood(neighborhood);

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

  public void deleteTract(Long id){
    tractRepository.deleteById(id);
  }

}
