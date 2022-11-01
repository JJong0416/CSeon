package cseon.api.repository;

import cseon.api.dto.response.WorkbookRes;
import cseon.domain.Workbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkbookRepository extends JpaRepository<Workbook, Long> {

    List<Workbook> findWorkbooksByWorkbookCreatedBy(Long workbookCreatedBy);
}
