package com.catolica.terraz.service;

import com.catolica.terraz.dto.NeighborhoodDTO;
import com.catolica.terraz.model.Neighborhood;
import com.catolica.terraz.repository.NeighborhoodRepository;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class NeighborhoodService {

    private final NeighborhoodRepository neighborhoodRepository;
    private final ModelMapper modelMapper;

    public List<NeighborhoodDTO> getAllNeighborhoods() {
        return neighborhoodRepository.findAll().stream()
                .map(nb -> modelMapper.map(nb, NeighborhoodDTO.class))
                .collect(Collectors.toList());
    }

    public NeighborhoodDTO getNeighborhoodById(Long id) {
        Neighborhood nb =
                neighborhoodRepository
                        .findById(id)
                        .orElseThrow(() -> new RuntimeException("Neighborhood not found, id=" + id));
        return modelMapper.map(nb, NeighborhoodDTO.class);
    }

    public NeighborhoodDTO createNeighborhood(NeighborhoodDTO dto) {
        Neighborhood nb =
                Neighborhood.builder()
                        .name(dto.getName())
                        .priceFactor(dto.getPriceFactor())
                        .build();

        Neighborhood saved = neighborhoodRepository.save(nb);
        return modelMapper.map(saved, NeighborhoodDTO.class);
    }

    public NeighborhoodDTO updateNeighborhood(Long id, NeighborhoodDTO dto) {
        Neighborhood existing =
                neighborhoodRepository
                        .findById(id)
                        .orElseThrow(() -> new RuntimeException("Neighborhood not found, id=" + id));

        existing.setName(dto.getName());
        existing.setPriceFactor(dto.getPriceFactor());

        Neighborhood saved = neighborhoodRepository.save(existing);
        return modelMapper.map(saved, NeighborhoodDTO.class);
    }

    public void deleteNeighborhood(Long id) {
        neighborhoodRepository.deleteById(id);
    }
}
