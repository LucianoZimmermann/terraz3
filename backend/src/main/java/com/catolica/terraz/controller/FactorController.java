package com.catolica.terraz.controller;

import com.catolica.terraz.dto.FactorDTO;
import com.catolica.terraz.service.FactorService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/factors")
@RequiredArgsConstructor
public class FactorController {
  private final FactorService factorService;

  @PostMapping
  public ResponseEntity<FactorDTO> saveFactor(@RequestBody FactorDTO factorDTO) {
    FactorDTO newFactor = factorService.saveFactor(factorDTO);
    return ResponseEntity.ok(newFactor);
  }

  @GetMapping
  public ResponseEntity<List<FactorDTO>> getAllFactors() {
    List<FactorDTO> factors = factorService.getAllFactors();
    return ResponseEntity.ok(factors);
  }

  //    @GetMapping
  //    public ResponseEntity<List<FactorTypeEnum>> getAllFactorsTypes() {
  //        return ResponseEntity.ok(factorService.getAllFactorsTypes());
  //    }
}
