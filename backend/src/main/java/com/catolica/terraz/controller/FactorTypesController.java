package com.catolica.terraz.controller;

import com.catolica.terraz.dto.FactorTypeDTO;
import com.catolica.terraz.service.FactorTypeService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/factor-types")
@RequiredArgsConstructor
public class FactorTypesController {
  private final FactorTypeService factorTypeService;

  @GetMapping
  public ResponseEntity<List<FactorTypeDTO>> getAllFactorTypes() {
    return ResponseEntity.ok(factorTypeService.getAllFactorTypes());
  }
}
