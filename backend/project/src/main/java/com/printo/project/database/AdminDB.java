package com.printo.project.database;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.printo.project.entities.Admin;


@Repository
public interface AdminDB extends JpaRepository<Admin, String> {
	
	//delete
	@Modifying
	@Transactional
	@Query("delete from admin where id=:id")
	int deleteByIdAdmin(@Param("id")String id);
	
//  Admin data verification
	@Query("FROM admin WHERE id= :x and password=:y") 
	Admin findAdminById(@Param("x")String id, @Param("y")String password);
	
	// add

	@Modifying
	  @Transactional
	    @Query(value = "insert into admin (id,name,password) "
	    		+ "VALUES (:id,:name,:password)", nativeQuery = true)
	int addAdminFinalToDB(@Param("id") String id,
    		@Param("name") String name,
    		@Param("password") String password);


//  Authorize data verification
	@Query("FROM admin WHERE id= :x") 
	Admin AuthorizeAdminById(@Param("x")String id);
	
}
	
	