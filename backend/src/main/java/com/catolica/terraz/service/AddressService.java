package com.catolica.terraz.service;

import com.catolica.terraz.dto.AddressDTO;
import com.catolica.terraz.model.Address;
import com.catolica.terraz.model.Neighborhood;
import com.catolica.terraz.repository.AddressRepository;
import com.catolica.terraz.repository.NeighborhoodRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

  public AddressDTO saveAddress(AddressDTO addressDTO) {
    Long nbId = addressDTO.getNeighborhood().getId();
    Neighborhood neighborhood =
        neighborhoodRepository
            .findById(nbId)
            .orElseThrow(() -> new RuntimeException("Neighborhood not found, id=" + nbId));

    Address entity = modelMapper.map(addressDTO, Address.class);
    entity.setNeighborhood(neighborhood);

    Address saved = addressRepository.save(entity);

    AddressDTO result = modelMapper.map(saved, AddressDTO.class);
    result.setNeighborhood(saved.getNeighborhood());
    return result;
  }

  public AddressDTO updateAddress(AddressDTO addressDTO) {
    Address existing =
        addressRepository
            .findById(addressDTO.getId())
            .orElseThrow(() -> new RuntimeException("Address not found, id=" + addressDTO.getId()));

    modelMapper.map(addressDTO, existing);

    Long newNbId = addressDTO.getNeighborhood().getId();
    if (!newNbId.equals(existing.getNeighborhood().getId())) {
      Neighborhood newNb =
          neighborhoodRepository
              .findById(newNbId)
              .orElseThrow(() -> new RuntimeException("Neighborhood not found, id=" + newNbId));
      existing.setNeighborhood(newNb);
    }

    Address saved = addressRepository.save(existing);

    AddressDTO result = modelMapper.map(saved, AddressDTO.class);
    return result;
  }

  public void deleteAddress(Long id) {
    addressRepository.deleteById(id);
  }
}
