package civa.backend.repository;

import civa.backend.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBusRepository extends JpaRepository<Bus, Integer> {
}
