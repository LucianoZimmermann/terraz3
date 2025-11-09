package com.catolica.terraz.controller;

import com.catolica.terraz.dto.TractOwnerDTO;
import com.catolica.terraz.dto.TractOwnerDeletionConflictDTO;
import com.catolica.terraz.service.TractOwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tract-owners")
@RequiredArgsConstructor
public class TractOwnerController {

  private final TractOwnerService tractOwnerService;

  @PostMapping
  public ResponseEntity<TractOwnerDTO> createTractOwner(@RequestBody TractOwnerDTO tractOwnerDTO) {
    return ResponseEntity.ok(tractOwnerService.save(tractOwnerDTO));
  }

  @GetMapping
  public ResponseEntity<List<TractOwnerDTO>> getAllTractOwners() {
    return ResponseEntity.ok(tractOwnerService.getAllTractOwners());
  }

  @GetMapping("/{id}")
  public ResponseEntity<TractOwnerDTO> getTractOwnerById(@PathVariable Long id) {
    return tractOwnerService
            .getTractOwnerById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<TractOwnerDTO> updateTractOwner(@PathVariable Long id, @RequestBody TractOwnerDTO dto) {
    return tractOwnerService.update(id, dto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<TractOwnerDeletionConflictDTO> deleteTractOwner(
          @PathVariable Long id,
          @RequestParam(name = "cascade", defaultValue = "false") boolean cascade) {
    return tractOwnerService.deleteOrReport(id, cascade)
            .map(conflict -> ResponseEntity.status(HttpStatus.CONFLICT).body(conflict))
            .orElse(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
  }
}
