package com.catolica.terraz.controller;

import com.catolica.terraz.dto.tractowner.TractOwnerDTO;
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
  public ResponseEntity<TractOwnerDTO> createTractOwner(@RequestBody TractOwnerDTO dto) {
    return ResponseEntity.ok(tractOwnerService.save(dto));
  }

  @GetMapping
  public ResponseEntity<List<TractOwnerDTO>> getAllTractOwners() {
    return ResponseEntity.ok(tractOwnerService.getAllTractOwners());
  }

  @GetMapping("/{id}")
  public ResponseEntity<TractOwnerDTO> getTractOwnerById(@PathVariable Long id) {
    return ResponseEntity.ok(tractOwnerService.getByIdOrThrow(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<TractOwnerDTO> updateTractOwner(@PathVariable Long id, @RequestBody TractOwnerDTO dto) {
    return ResponseEntity.ok(tractOwnerService.update(id, dto));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTractOwner(@PathVariable Long id,
                               @RequestParam(name = "cascade", defaultValue = "false") boolean cascade) {
    tractOwnerService.delete(id, cascade);
  }
}
