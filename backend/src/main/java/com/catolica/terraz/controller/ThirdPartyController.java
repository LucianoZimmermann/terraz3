package com.catolica.terraz.controller;

import com.catolica.terraz.dto.ThirdPartyDTO;
import com.catolica.terraz.service.ThirdPartyService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/third-party")
@RequiredArgsConstructor
public class ThirdPartyController {
  private final ThirdPartyService thirdPartyService;

  @PostMapping
  public ResponseEntity<ThirdPartyDTO> saveThirdParty(@RequestBody ThirdPartyDTO thirdPartyDTO) {
    return ResponseEntity.ok(thirdPartyService.saveThirdParty(thirdPartyDTO));
  }

  @GetMapping
  public ResponseEntity<List<ThirdPartyDTO>> getAllThirdParty() {
    return ResponseEntity.ok(thirdPartyService.getAllThirdParty());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ThirdPartyDTO> getThirdPartyById(@PathVariable Long id) {
    return ResponseEntity.ok(thirdPartyService.getThirdPartyById(id));
  }
}
