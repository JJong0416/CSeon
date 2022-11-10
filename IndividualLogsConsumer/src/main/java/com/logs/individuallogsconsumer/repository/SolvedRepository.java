package com.logs.individuallogsconsumer.repository;

import com.logs.individuallogsconsumer.domain.AccountSolved;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolvedRepository extends MongoRepository<AccountSolved, String> {
}
