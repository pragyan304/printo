package com.printo.project.database;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.printo.project.entities.PrintDetails;


@Repository
public interface PrintLogDB extends JpaRepository<PrintDetails, Integer> {
	
	
	
	//  trunacate table
	  @Modifying
	  @Transactional
	    @Query(
	            value = "truncate table print_details",
	            nativeQuery = true
	    )
	    void truncateMyTable();
	
	
	
	//   insert print log
	@Modifying
	  @Transactional
	    @Query(value = "insert into print_details (jobid,printername,username,jobname,sheet,date) "
	    		+ "VALUES (:id,:pn,:us,:jb,:s,:d)", nativeQuery = true)
	    int logURI(@Param("id") int jobid,
	    		@Param("pn") String printername,
	    		@Param("us") String username,
	    		@Param("jb") String jobname,
	    		@Param("s") int  sheet,
	    		@Param("d") Date date);
	
	
	
	
	// select data on username
	@Query("FROM print_details WHERE username = :x") 
	Collection<PrintDetails> two(@Param("x")String username);
	
	// select data on pintername
	@Query("FROM print_details WHERE printername= :y") 
	Collection<PrintDetails> three(@Param("y") String printername);

	// // select data on username and password
	@Query("FROM print_details WHERE username = :x and printername= :y") 
	Collection<PrintDetails> four(@Param("x")String username, @Param("y")String printername);
	
	
	
	// select data on data range,username, and printername
	@Query("FROM print_details WHERE date>= :d and date<= :d1 and username = :x and printername= :y") 
	Collection<PrintDetails> specifycPrinterRecordWithSpecifyDate(@Param("x")String username,
								  @Param("y")String printername,
								  @DateTimeFormat(pattern = "yyyy-MM-dd")	  @Param("d")  java.sql.Date date,
								  @DateTimeFormat(pattern = "yyyy-MM-dd")	  @Param("d1")  java.sql.Date date1);	
	
	
	// select data on data range
	@Query("FROM print_details WHERE date>= :d and date<= :d1") 
	Collection<PrintDetails> allRecordWithSpecifyDate(@Param("d")  java.sql.Date date,@Param("d1")  java.sql.Date date1);

	// select data on username and data range
	@Query("FROM print_details WHERE date>= :d and date<= :d1 and username = :x") 
	Collection<PrintDetails> specifycUserRecordWithSpecifyDate(@Param("x")String username,
								  @DateTimeFormat(pattern = "yyyy-MM-dd")	  @Param("d")  java.sql.Date date,
								  @DateTimeFormat(pattern = "yyyy-MM-dd")	  @Param("d1")  java.sql.Date date1);	
	
	// select data on data range
	@Query("FROM print_details WHERE date>= :d and date<= :d1") 
	Collection<PrintDetails> specifycPrinterRecordWithSpecifyDate(
								  @DateTimeFormat(pattern = "yyyy-MM-dd")	  @Param("d")  java.sql.Date date,
								  @DateTimeFormat(pattern = "yyyy-MM-dd")	  @Param("d1")  java.sql.Date date1);


	// select data on username and data
	@Query("FROM print_details WHERE username= :username and date= :date") 
	Collection<PrintDetails> getClientTodayDataDB(@Param("username") String username, 
												  @Param("date") java.sql.Date date);
}


