package com.catolica.terraz.controller;

import com.catolica.terraz.dto.quote.CreatedQuoteDTO;
import com.catolica.terraz.dto.quote.RequestQuoteDTO;
import com.catolica.terraz.dto.quote.ResponseQuoteDTO;
import com.catolica.terraz.dto.quote.UpdateQuoteDTO;
import com.catolica.terraz.service.QuoteService;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quotes")
@RequiredArgsConstructor
public class QuoteController {

  private final QuoteService quoteService;

  @PostMapping
  public ResponseEntity<CreatedQuoteDTO> saveQuote(@RequestBody RequestQuoteDTO quoteDTO) {
    CreatedQuoteDTO createdQuote = quoteService.saveQuote(quoteDTO);
    return ResponseEntity.ok(createdQuote);
  }

  @GetMapping
  public ResponseEntity<List<ResponseQuoteDTO>> getAllQuotes() {
    List<ResponseQuoteDTO> quotes = quoteService.getAllQuotes();
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

  @PutMapping("/{id}")
  public ResponseEntity<ResponseQuoteDTO> updateQuote(@PathVariable Long id, @RequestBody UpdateQuoteDTO dto){
    dto.setId(id);
    return ResponseEntity.ok(quoteService.updateQuote(dto));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteQuote(@PathVariable Long id){
    quoteService.deleteQuote(id);
  }
}
