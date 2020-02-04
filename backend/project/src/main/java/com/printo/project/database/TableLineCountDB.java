package com.printo.project.database;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.printo.project.entities.TableLineCount;

@Repository
public interface TableLineCountDB extends JpaRepository<TableLineCount, Integer> {
	
	
		// truncate table
	  @Modifying
	  @Transactional
	    @Query(
	            value = "truncate table tablelinecount",
	            nativeQuery = true
	    )
	    void truncateMyTable();

	  // insert into table
	@Modifying
	  @Transactional
	    @Query(value = "insert into tablelinecount (idofstatus,status)"
	    		+ "VALUES (:idst,:st)", nativeQuery = true)
	    void insertLine(@Param("idst") int idofstatus,
	    		@Param("st") long no);
	    	
	// update table
	@Modifying
		@Transactional
		@Query("UPDATE tablelinecount u SET u.status = :s WHERE u.idofstatus = :id")
		void updateLine(@Param("s") long l, @Param("id") int idofstatus);
	
	
	//select from table
	@Modifying
	@Transactional
	@Query("FROM tablelinecount WHERE idofstatus = :id")
	TableLineCount findOneData(@Param("id") int idofstatus);
}
