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
import com.printo.project.entities.Client;


@Repository
public interface ClientDB extends JpaRepository<Client, String> {
	
	
	// add client to db
	@Modifying
	  @Transactional
	    @Query(value = "insert into client (id,clientpcname,name,password) "
	    		+ "VALUES (:id,:clientpcname,:name,:password)", nativeQuery = true)
	    int addClientFinalToDB(@Param("id") String id,
	    		@Param("clientpcname") String clientpcname,
	    		@Param("name") String name,
	    		@Param("password") String password);
	
		
	//  Client data verification
		@Query("FROM client WHERE id= :x") 
		Client findDataById(@Param("x")String id);
	
		// delete
		@Modifying
		@Transactional
		@Query("delete from client where id=:id")
		int deleteByIdClient(@Param("id")String id);
		
		
		// data verified client on username and password
		@Query("FROM client WHERE id= :x and password= :y") 
		Client findClientById(@Param("x")String id,@Param("y") String password);
		
	
}
	
	