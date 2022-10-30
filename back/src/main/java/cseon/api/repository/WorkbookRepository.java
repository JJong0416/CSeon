package cseon.api.repository;

import cseon.domain.Workbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkbookRepository extends JpaRepository<Workbook, Long> {

    Optional<List<Workbook>> findAllWorkbooks();
    Optional<Workbook> findWorkbookByWorkbookId(Long workbookId);

    @Query(value = "")
    Optional<Workbook> findLastWorkbook();


}
