package civa.backend.controller;

import civa.backend.model.Bus;
import civa.backend.service.BusService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buses")
@CrossOrigin(origins = {"http://127.0.0.1:3000", "http://localhost:3000", "null"})
public class BusController {

    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping
    public Page<Bus> list(@RequestParam(defaultValue = "0") int page,
                          @RequestParam(defaultValue = "10") int size) {
        return busService.getAll(page, size);
    }

    @GetMapping("list/{id}")
    public ResponseEntity<Bus> buscar(@PathVariable int id) {
        return busService.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(()-> ResponseEntity.notFound().build());
    }
    @PostMapping
    public Bus crear(@RequestBody Bus bus) {
        return busService.create(bus);
    }
}
