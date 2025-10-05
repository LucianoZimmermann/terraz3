package com.catolica.terraz.controller;

import com.catolica.terraz.dto.TractOwnerDTO;
import com.catolica.terraz.service.TractOwnerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
