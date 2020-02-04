package com.printo.project;


import java.util.Collection;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.printo.project.entities.Admin;
import com.printo.project.entities.Client;
import com.printo.project.entities.PrintDetails;
import com.printo.project.services.AdminService;
import com.printo.project.services.ClientService;
import com.printo.project.services.PrintLogService;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Entry {
	
	
	@Autowired
	private ResetDataBase resetDataBase;
	@Autowired
	private ReadData data;
	@Autowired
	private ClientService clientService;
	@Autowired
	private AdminService adminService;
	@Autowired
	private PrintLogService printLogService;
	final static Logger logger = Logger.getLogger(Entry.class);
	
				// reset database
				@RequestMapping("/resetdatabase") 
				public String getMessage()
				{	
				try {
					resetDataBase.read();
				} catch (Exception e) {
					logger.error("problem in resetting database");
					return null;
				}
				logger.info("database is reseted succesfully");
					return "success";
				}			
				
				// refresh database
				@RequestMapping("/refresh") 
				public void getRefresh()
				{
					data.read();
					logger.info("log is readed succesfully");	
				}
	
	
	
				// get all data of print_details table
				@PostMapping("/ggt") 
				public Collection<PrintDetails> getNew( @RequestBody PrintDetails ww)
				{	
					Collection<PrintDetails> x=null;
					try {
						x=printLogService.getSeperated(ww);
						logger.info("data retrived from print_details table by paremeter "+ww.getUsername()+" "+ww.getPrintername()+" "+ww.getDate()+" "+ww.getDate1());
					} catch (Exception e) {
						logger.error("some error occure to fetch data with paremeter "+ww.getUsername()+" "+ww.getPrintername()+" "+ww.getDate()+" "+ww.getDate1());
						x=null;
					}
					return x;
				}
	
				// Admin verification
				@RequestMapping("/abc")
				public Admin validateAdmin(@RequestBody Admin uu){
					Admin admin =adminService.validateAdmin(uu);
					logger.info("verify admin");
					return admin;
				}
	
				//client verification
				@RequestMapping("/xyz")
				public Client validateClient(@RequestBody Client uu){
					Client client =clientService.validateClient(uu);
					logger.info("verify client");
					return client;
				}
	
	
				// download report
				@RequestMapping("/download")
				public String download(@RequestBody PrintDetails pdata){	
					printLogService.downloadReport(pdata);
					logger.info("report downloaded succesfully");
					return null;
					}
	
	
				// add client 
				@RequestMapping("/addclient")
				public int addNewClient(@RequestBody Client data){	
					int status=0;
					try {
						status=clientService.addnewClientToDB(data);
						logger.info("new client added succesfully");
					} catch (Exception e) {
						status=0;
						logger.error("error in inserting new client");
					}
					return status;
					}
	
				// delete client 
				@RequestMapping("/deleteclient")
				public int deleteClient(@RequestBody Client data){	
					int status=0;
					try {
						status=clientService.deletenewClientToDB(data);
						logger.info("delete client");
					} catch (Exception e) {
						logger.error("error in deleting client");
						status=0;
					}
					return status;
					}
	
				// add admin 
				@RequestMapping("/addadmin")
				public int addNewAdmin(@RequestBody Admin data){	
					int status=0;
					try {
						status=adminService.addnewAdminToDB(data);
						logger.info("add new admin");
					} catch (Exception e) {
						logger.error("errer in adding new admin");
						status=0;
					}
					return status;
					}
				
				// delete admin on admin request
				@RequestMapping("/deleteadmin")
				public int deleteAdmin(@RequestBody Admin data){
					int status=0;
					try {
						status=adminService.deleteAdminToDB(data);
						logger.info("delete admin");
					} catch (Exception e) {
						logger.error("error in delete admin");
						status=0;
					}
					return status;
					}
				
				// return client table on admin request
				@RequestMapping("/getallclientdata")
				public List<Client> getAllClient(){
					List<Client> data =clientService.getAllDataClient();
					logger.info("get all client");
					return data;
					}
				
				// return admin table on admin request
				@RequestMapping("/getalladmindata")
				public List<Admin> getAllAdmin(){
					List<Admin> data =adminService.getAllDataAdmin();
					logger.info("get all admin");
					return data;
					}
				
				// this part of our application will only execute once when
				// we start our application on a specific system 
				@RequestMapping("/check")
				public long getNoOfAdmin(){
					long data =adminService.getCountOfAdmin();
					logger.info("count admin table entry");
					return data;
					}
				
				
				// validate client while login
				@RequestMapping("/getclientdata")
				public Client validClient(@RequestBody String id){
					logger.info("validate client while login");
					return clientService.getClientValid(id);
					}
				
				
				
				// get client print data for client portal
				@RequestMapping("/getniqueclientdata")
				public Collection<PrintDetails> getUniqueClientPrintData(@RequestBody String id){
					Collection<PrintDetails> data=printLogService.getUniqueData(id);
					if(data.isEmpty()==true) {
						data=null;
					}
					logger.info("get client print data for client portal");
					return data;
					}
				
				// Authorize admin for home page after admin login
				@RequestMapping("/getAdmindata")
				public Admin validAdmin(@RequestBody String id){
					Admin ad=new Admin();
					ad.setId(id);
					Admin admin=adminService.Authorize(ad);
					logger.info("Authorize admin for home page after admin login");
					return admin;
					}		
				
				// getClientTodayData
				@RequestMapping("/getClientTodayData")
				public Collection<PrintDetails> getClientTodayData(@RequestBody String id){
					Collection<PrintDetails> data=printLogService.getClientTodayDataService(id);
					logger.info("getClientTodayData");
					return data;
					}	
				
				
				// getClientDateRangeData
				@RequestMapping("/getClientDateRangeData")
				public Collection<PrintDetails> getClientDateRangeData(@RequestBody PrintDetails details){
					Collection<PrintDetails> data=printLogService.getClientDateRangeDataService(details);
					logger.info("getClientDateRangeData");
					return data;
					}	
}

