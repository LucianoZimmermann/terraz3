package com.catolica.terraz.controller;

import com.catolica.terraz.dto.TractDTO;
import com.catolica.terraz.service.TractService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tracts")
@RequiredArgsConstructor
public class TractController {
  private final TractService tractService;

  @PostMapping
  public ResponseEntity<TractDTO> saveTract(@RequestBody TractDTO tractDTO) {
    TractDTO saveTractDTO = tractService.saveTract(tractDTO);
    return ResponseEntity.ok(saveTractDTO);
  }

  @GetMapping()
  public ResponseEntity<List<TractDTO>> getAllTract() {
    List<TractDTO> tracts = tractService.getAllTracts().stream().toList();
    return ResponseEntity.ok(tracts);
  }

  @PutMapping("/{id}")
  public ResponseEntity<TractDTO> updateTract(@PathVariable Long id, @RequestBody TractDTO tractDTO){
    tractDTO.setId(id);
    TractDTO updatedTract = tractService.updateTract(tractDTO);
    return ResponseEntity.ok(updatedTract);
  }
}
