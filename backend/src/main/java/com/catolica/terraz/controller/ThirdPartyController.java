package com.catolica.terraz.controller;

import com.catolica.terraz.dto.ThirdPartyDTO;
import com.catolica.terraz.dto.thirdparty.CreateThirdPartyDTO;
import com.catolica.terraz.dto.thirdparty.UpdateThirdPartyDTO;
import com.catolica.terraz.service.ThirdPartyService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/third-parties")
@RequiredArgsConstructor
public class ThirdPartyController {
  private final ThirdPartyService thirdPartyService;

  @PostMapping
  public ResponseEntity<ThirdPartyDTO> saveThirdParty(@RequestBody CreateThirdPartyDTO thirdPartyDTO) {
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

  @PutMapping("/{id}")
  public ResponseEntity<ThirdPartyDTO> updateThirdParty(@PathVariable Long id,  @RequestBody UpdateThirdPartyDTO thirdPartyDTO){
    thirdPartyDTO.setId(id);
    return ResponseEntity.ok(thirdPartyService.updateThirdParty(thirdPartyDTO));
  }

  @DeleteMapping("/{id}")
  public void deleteThirdParty(@PathVariable Long id){
    thirdPartyService.deleteThirdParty(id);
  }
}
