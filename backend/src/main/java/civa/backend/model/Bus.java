package civa.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "numero_de_bus", nullable = false)
    private Integer numeroBus;

    @Column(name = "placa", nullable = false, length = 20, unique = true)
    private String placa;

    @CreationTimestamp
    @Column(name = "fecha_de_creacion", updatable = false, nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "descripcion", length = 255)
    private String descripcion;

    @Enumerated(EnumType.STRING)
    @Column(name = "marca_buses", nullable = false, length = 20)
    private MarcaBuses marcaBuses;

    @Column(name = "estado", nullable = false)
    private boolean estado = true;
}