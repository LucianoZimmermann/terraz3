package com.catolica.terraz.service;

import com.catolica.terraz.dto.tract.TractAddressItem;
import com.catolica.terraz.dto.tractowner.TractOwnerDTO;
import com.catolica.terraz.exception.ExceptionHelper;
import com.catolica.terraz.model.TractOwner;
import com.catolica.terraz.repository.TractOwnerRepository;
import com.catolica.terraz.repository.TractRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.catolica.terraz.exception.ExceptionHelper.*;

@Service
@RequiredArgsConstructor
public class TractOwnerService {

    private final TractOwnerRepository tractOwnerRepository;
    private final TractRepository tractRepository;
    private final ModelMapper modelMapper;
    private final String entityType = "Tract"

    public TractOwnerDTO save(TractOwnerDTO dto) {
        TractOwner entity = modelMapper.map(dto, TractOwner.class);
        entity = tractOwnerRepository.save(entity);
        return modelMapper.map(entity, TractOwnerDTO.class);
    }

    public List<TractOwnerDTO> getAllTractOwners() {
        return tractOwnerRepository.findAll().stream()
                .map(e -> modelMapper.map(e, TractOwnerDTO.class))
                .toList();
    }

    public TractOwnerDTO getByIdOrThrow(Long id) {
        TractOwner entity = tractOwnerRepository.findById(id).orElseThrow(() -> ExceptionHelper.notFoundException(entityType, id));
        return modelMapper.map(entity, TractOwnerDTO.class);
    }

    @Transactional
    public TractOwnerDTO update(Long id, TractOwnerDTO dto) {
        TractOwner entity = tractOwnerRepository.findById(id).orElseThrow(() -> ExceptionHelper.notFoundException(entityType, id));
        modelMapper.map(dto, entity);
        entity.setId(id);
        entity = tractOwnerRepository.save(entity);
        return modelMapper.map(entity, TractOwnerDTO.class);
    }

    @Transactional
    public void delete(Long id, boolean cascade) {
        TractOwner owner = tractOwnerRepository.findById(id).orElseThrow(() -> ExceptionHelper.notFoundException(entityType, id));

        long cnt = tractRepository.countByTractOwnerId(id);
        if (cnt > 0 && !cascade) {
            List<TractAddressItem> tractAddressItem = tractRepository.findTractAddressesByOwnerId(id);
            throw ownerDeletionConflict(id, cnt, tractAddressItem);
        }
        if (cnt > 0 && cascade) {
            tractRepository.deleteByTractOwnerId(id);
        }
        tractOwnerRepository.delete(owner);
    }
}
