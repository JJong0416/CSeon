package com.logs.individuallogsconsumer.repository;

import com.logs.individuallogsconsumer.domain.Tries;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TryRepository extends MongoRepository<Tries, String> {
}
