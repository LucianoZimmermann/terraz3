package com.catolica.terraz.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "tracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tract {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  @NotNull
  private Float squareMeters;

  @ManyToOne
  @JoinColumn(name = "tract_owner_id")
  private TractOwner tractOwner;

  @Column
  private String street;

  @Column
  private String number;

  @Column
  private String city;

  @Column
  private String state;

  @Column
  private String cep;

  @ManyToOne
  @JoinColumn(name = "neighborhood_id")
  private Neighborhood neighborhood;
}
