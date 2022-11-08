package com.cseon.repository;

import com.cseon.domain.Tries;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogsRepository extends MongoRepository<Tries, String> {

}
