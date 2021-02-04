const CrowdBank = artifacts.require("CrowdBank.sol");

contract('CrowdBank ', (accounts) => {
    let crowdbank;
    beforeEach(async () => {
      crowdbank = await CrowdBank.deployed();
      assert(crowdbank.address !== ''); 
    });


  
  it("should allow people to propose loan and people to lend on it", async () => {
    
   const mortgage = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  

   const newloan = await crowdbank.newLoan(100, 106000, mortgage, {from:accounts[0]});
   const loanlist = await crowdbank.loanList(0);
   assert.equal(loanlist[1].valueOf(), 0,      "state does not match");
   assert.equal(loanlist[2].valueOf(), 106000, "dueDate does not match");
   assert.equal(loanlist[3].valueOf(), 100,   "amount does not match");

   
   const newproposal = await crowdbank.newProposal(0, 10, {value: 1, from: accounts[1]});

   const totalproposalsby = await crowdbank.totalProposalsBy.call(accounts[1]);
   assert.equal(totalproposalsby.valueOf(), 1, "Proposal not submitted");

  });

  it("should handle getters", async () => {
 
   const mortgage = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  

   const newloan = await crowdbank.newLoan(100, 106000, mortgage, {from:accounts[0]});
   const loanlist = await crowdbank.loanList(0);
   assert.equal(loanlist[0].valueOf(), accounts[0],      "borrower address does not match");
   
   const newproposal = await crowdbank.newProposal(0, 10, {value: 1, from: accounts[1]});
   const proposalist = await crowdbank.proposalList(0);
   assert.equal(proposalist[0].valueOf(), accounts[1],   "lender address does not match");

   const activeloanid = await crowdbank.getActiveLoanId(accounts[0]);
   assert.equal(activeloanid.valueOf(), 0, "active loan id does not match");
   
  });

   it("should allow borrower to ask for loan", async () => {

    const mortgage = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  

    const newloan = await crowdbank.newLoan(100, 106000, mortgage, {from:accounts[0]});
    

    const response = await crowdbank.getLoanDetailsByAddressPosition.call(accounts[0], 0);
    assert.equal(response[0].valueOf(), 0,        "state does not match");
    assert.equal(response[1].valueOf(), 106000,   "dueDate does not match");
    assert.equal(response[2].valueOf(), 100,     "amount does not match");

  });

  it("should allow lender to make loan proposal", async () => {

    const mortgage = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  

    const newloan = await crowdbank.newLoan(20, 106000, mortgage, {from:accounts[0]});      // Borrower asks for loan
    const newproposal = await crowdbank.newProposal(0, 10, {value: 1, from: accounts[1]});   // Lender makes proposal    

   
    const response2 = await crowdbank.getProposalDetailsByLoanIdPosition.call(0, 0);
    assert.equal(response2[0].valueOf(), 0,        "state does not match");
    assert.equal(response2[1].valueOf(), 10,       "rate does not match");
    assert.equal(response2[2].valueOf(), 1,      "amount does not match");

  });
  

});
