package com.catolica.terraz.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "tract_owners")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TractOwner {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull @Column private String name;

  @NotNull @Column private String cpf;
}
