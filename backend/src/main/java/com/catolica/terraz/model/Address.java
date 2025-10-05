package com.catolica.terraz.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String street;

  private String number;

  private String city;

  @ManyToOne
  @JoinColumn(name = "neighborhood_id")
  private Neighborhood neighborhood;

  private String state;

  private String cep;
}
