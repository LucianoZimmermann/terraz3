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
    private String phone;
    private String contactName;
    private Long factorTypeId;
}
