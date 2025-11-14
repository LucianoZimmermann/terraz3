package com.catolica.terraz.service;

import com.catolica.terraz.dto.adress.AddressDTO;
import com.catolica.terraz.dto.adress.AddressCreateDTO;
import com.catolica.terraz.dto.adress.AddressUpdateDTO;
import com.catolica.terraz.enums.EntityType;
import com.catolica.terraz.exception.ExceptionHelper;
import com.catolica.terraz.model.Address;
import com.catolica.terraz.model.Neighborhood;
import com.catolica.terraz.repository.AddressRepository;
import com.catolica.terraz.repository.NeighborhoodRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AddressService {

  private final AddressRepository addressRepository;
  private final NeighborhoodRepository neighborhoodRepository;
  private final ModelMapper modelMapper;

  public List<AddressDTO> getAllAddresses() {
    return addressRepository.findAll().stream()
        .map(
            address -> {
              AddressDTO dto = modelMapper.map(address, AddressDTO.class);
              return dto;
            })
        .collect(Collectors.toList());
  }

  public AddressDTO getAddressById(Long id) {
    Address address =
        addressRepository
            .findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Address not found with id " + id));
    return modelMapper.map(address, AddressDTO.class);
  }

  @Transactional
  public AddressDTO saveAddress(AddressCreateDTO dto) {
    Neighborhood nb = neighborhoodRepository.findById(dto.getNeighborhoodId())
            .orElseThrow(() -> new RuntimeException("Neighborhood not found, id=" + dto.getNeighborhoodId()));

    Address entity = new Address();
    entity.setStreet(dto.getStreet());
    entity.setNumber(dto.getNumber());
    entity.setCity(dto.getCity());
    entity.setState(dto.getState());
    entity.setCep(dto.getCep());
    entity.setNeighborhood(nb);

    Address saved = addressRepository.save(entity);
    return modelMapper.map(saved, AddressDTO.class);
  }

  @Transactional
  public AddressDTO updateAddress(AddressUpdateDTO dto) {
    Address existing = addressRepository.findById(dto.getId())
            .orElseThrow(() -> ExceptionHelper.notFoundException(EntityType.ADDRESS, dto.getId()));

    existing.setStreet(dto.getStreet());
    existing.setNumber(dto.getNumber());
    existing.setCity(dto.getCity());
    existing.setState(dto.getState());
    existing.setCep(dto.getCep());

    if (dto.getNeighborhoodId() != null) {
      Long cur = existing.getNeighborhood() != null ? existing.getNeighborhood().getId() : null;
      if (!java.util.Objects.equals(cur, dto.getNeighborhoodId())) {
        Neighborhood nb = neighborhoodRepository.getReferenceById(dto.getNeighborhoodId());
        existing.setNeighborhood(nb);
      }
    }

    Address saved = addressRepository.save(existing);
    return modelMapper.map(saved, AddressDTO.class);
  }

  public void deleteAddress(Long id) {
    addressRepository.deleteById(id);
  }
}
