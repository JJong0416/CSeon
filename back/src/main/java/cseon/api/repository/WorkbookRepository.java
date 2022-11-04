package cseon.api.repository;

import cseon.domain.Workbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkbookRepository extends JpaRepository<Workbook, Long> {

    @Query(value = "select w from Workbook w")
    Optional<List<Workbook>> findAllWorkbooks();

    Optional<Workbook> findWorkbookByWorkbookId(Long workbookId);

    Optional<Workbook> findWorkbooksByWorkbookCreatedByAndWorkbookName(Long workbookCreatedBy, String workbookName);

    List<Workbook> findWorkbooksByWorkbookCreatedBy(String workbookCreatedBy);
}
