package com.catolica.terraz.dto.thirdparty;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateThirdPartyDTO {
    private String cnpj;
    private String name;
    private Long factorTypeId;
}
