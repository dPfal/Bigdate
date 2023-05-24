package gachon.bigdate.thenthen.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name ="hit_counts_tb")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HitCount {
    @Id
    @Column(name ="hit_count_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hitCountId;
    @Column(name ="remote_addr")
    private String remoteAddr;

    @Column(name ="visit_date")
    private LocalDateTime visitDate;

}
