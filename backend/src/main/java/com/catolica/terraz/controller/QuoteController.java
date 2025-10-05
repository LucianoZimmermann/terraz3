package com.catolica.terraz.controller;

import com.catolica.terraz.dto.request.RequestQuoteDTO;
import com.catolica.terraz.dto.response.ResponseQuoteDTO;
import com.catolica.terraz.service.QuoteService;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quotes")
@RequiredArgsConstructor
public class QuoteController {

  private final QuoteService quoteService;

  @PostMapping
  public ResponseEntity<ResponseQuoteDTO> saveQuote(@RequestBody RequestQuoteDTO quoteDTO) {
    ResponseQuoteDTO createdQuote = quoteService.saveQuote(quoteDTO);
    return ResponseEntity.ok(createdQuote);
  }

  @GetMapping
  public ResponseEntity<List<RequestQuoteDTO>> getAllQuotes() {
    List<RequestQuoteDTO> quotes = quoteService.getAllQuotes();
    return ResponseEntity.ok(quotes);
  }

  @GetMapping("/{id}")
  public ResponseEntity<RequestQuoteDTO> getQuoteById(@PathVariable Long id) {
    Optional<RequestQuoteDTO> quoteDTO = quoteService.getQuoteById(id);
    return quoteDTO.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/owner/{id}")
  public ResponseEntity<List<RequestQuoteDTO>> getQuotesByOwnerId(@PathVariable Long id) {
    List<RequestQuoteDTO> quotes = quoteService.getQuotesByOwnerId(id);
    return ResponseEntity.ok(quotes);
  }
}
