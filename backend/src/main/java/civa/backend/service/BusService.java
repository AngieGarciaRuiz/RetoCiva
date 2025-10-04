package civa.backend.service;

import civa.backend.model.Bus;
import civa.backend.repository.IBusRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BusService {

    private final IBusRepository busRepository;

    public BusService(IBusRepository busRepository) {
        this.busRepository = busRepository;
    }

    public Page<Bus> getAll(int page, int size) {
        return busRepository.findAll(PageRequest.of(page, size));
    }

    public Optional<Bus> getById(int id) {
        return busRepository.findById(id);
    }

    public Bus create(Bus bus) {
        return busRepository.save(bus);
    }
}
