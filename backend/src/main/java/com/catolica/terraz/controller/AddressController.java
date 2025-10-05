package com.catolica.terraz.controller;

import com.catolica.terraz.dto.AddressDTO;
import com.catolica.terraz.service.AddressService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/addresses")
@RequiredArgsConstructor
public class AddressController {
  private final AddressService addressService;

  @PostMapping
  public ResponseEntity<AddressDTO> saveAddress(@RequestBody AddressDTO addressDTO) {
    addressService.saveAddress(addressDTO);
    return ResponseEntity.ok(addressDTO);
  }

  @GetMapping
  public ResponseEntity<List<AddressDTO>> getAllAddresses() {
    return ResponseEntity.ok(addressService.getAllAddresses());
  }

  @GetMapping("/{id}")
  public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long id) {
    return ResponseEntity.ok(addressService.getAddressById(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<AddressDTO> updateAddress(
      @PathVariable Long id, @RequestBody AddressDTO addressDTO) {
    addressDTO.setId(id);
    return ResponseEntity.ok(addressService.updateAddress(addressDTO));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
    addressService.deleteAddress(id);
    return ResponseEntity.noContent().build();
  }
}
