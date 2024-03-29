package com.printo.project.services;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.printo.project.database.AdminDB;
import com.printo.project.entities.Admin;
import com.printo.project.interfaces.AdminServiceInterface;

@Service
public class AdminService implements AdminServiceInterface {

	@Autowired
	private AdminDB adminDB;
	
		// get all admin
		public List<Admin> getAllDataAdmin() {
			List<Admin> data=adminDB.findAll();
			return data;
		}
		//delete admin
		public int deleteAdminToDB(Admin data) {
			int x=adminDB.deleteByIdAdmin(data.getId());
			return x;
		}
		
		//  add admin to db
		public int addnewAdminToDB(Admin data) {
			int status=adminDB.addAdminFinalToDB(data.getId(),data.getName(),data.getPassword());
			return status;
		}
		//validate admin 
			public Admin validateAdmin(Admin uu) {
				Admin data=adminDB.findAdminById(uu.getId(),uu.getPassword());
			return data;
			 
		}
		// authorize user
		public Admin Authorize(Admin uu) {
			Admin data=adminDB.AuthorizeAdminById(uu.getId());
			return data;
			 
		}
		// count admin entity
		public long getCountOfAdmin() {
			long number=adminDB.count();
			return number;
		}
		

}
