package com.catolica.terraz.controller;

import com.catolica.terraz.dto.NeighborhoodDTO;
import com.catolica.terraz.service.NeighborhoodService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/neighborhoods")
@RequiredArgsConstructor
public class NeighborhoodController {

  private final NeighborhoodService neighborhoodService;

  @GetMapping
  public ResponseEntity<List<NeighborhoodDTO>> getAllNeighborhoods() {
    List<NeighborhoodDTO> list = neighborhoodService.getAllNeighborhoods();
    return ResponseEntity.ok(list);
  }

  @GetMapping("/{id}")
  public ResponseEntity<NeighborhoodDTO> getNeighborhoodById(@PathVariable Long id) {
    NeighborhoodDTO dto = neighborhoodService.getNeighborhoodById(id);
    return ResponseEntity.ok(dto);
  }

  @PostMapping
  public ResponseEntity<NeighborhoodDTO> createNeighborhood(
      @Valid @RequestBody NeighborhoodDTO neighborhoodDTO) {
    NeighborhoodDTO created = neighborhoodService.createNeighborhood(neighborhoodDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<NeighborhoodDTO> updateNeighborhood(
      @PathVariable Long id, @Valid @RequestBody NeighborhoodDTO neighborhoodDTO) {
    NeighborhoodDTO updated = neighborhoodService.updateNeighborhood(id, neighborhoodDTO);
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteNeighborhood(@PathVariable Long id) {
    neighborhoodService.deleteNeighborhood(id);
  }
}
