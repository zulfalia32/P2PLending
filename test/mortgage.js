const Mortgage = artifacts.require("Mortgage.sol");

contract('Mortgage', (accounts) => {
    let mortgage;
    beforeEach(async () => {
      mortgage = await Mortgage.deployed();
      //console.log('healthrecordmgt.address = ',healthrecordmgt.address)
      assert(mortgage.address !== ''); 
    });

  
  it("The borrower was successfully added as the original owner of the mortgage document", async () => {
    
   const document = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  

   await mortgage.addData(document, {from:accounts[0]});
   const owner = await mortgage.ownerMap(document,0);
   
   //assert.equal(owner.valueOf(), accounts[0], `${accounts[0]} is not the original owner of the document`);

   assert(owner === accounts[0]); 

  });

  it("The borrower was successfully identified as the original owner of the mortgage document", async () => {
    
    const document = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  
 
    await mortgage.addData(document, {from:accounts[0]});
    const mortgageDocument = await mortgage.mortgageMap(accounts[0],0);
 
    assert(mortgageDocument === document);
 
   });

   it("The borrower was successfully added as the original owner of the multiple mortgage documents", async () => {
    
    const document1 = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  
    const document2=  "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01faa"; 
 
    await mortgage.addData(document1, {from:accounts[0]});
    await mortgage.addData(document2, {from:accounts[0]});

    const mortgageDocument1 = await mortgage.mortgageMap(accounts[0],0);
    const mortgageDocument2 = await mortgage.mortgageMap(accounts[0],1);
  
    assert(mortgageDocument1 === document1);
    assert(mortgageDocument2 === document2);
 
   });

   it('This person was successfully verified as the original owner of this mortgage document', async () => {
    const document = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  
 
    await mortgage.addData(document, {from:accounts[0]});
    const owner = await mortgage.getOwnerByPosition(document,0);
 
    assert(owner === accounts[0]);
  });

   it('This person was successfully verified as NOT the owner of this mortgage document', async () => {
    const document = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  
 
    await mortgage.addData(document, {from:accounts[0]});
    const owner = await mortgage.getOwnerByPosition(document,0);
   
    assert(owner !== accounts[1]);
  });

  it("This persons were successfully added as the 1st and 2nd owners of the mortgage document", async () => {
    
    const document = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  
    
    await mortgage.addData(document, {from:accounts[0]});
    await mortgage.addData(document, {from:accounts[1]});
    const owner = await mortgage.ownerMap(document,0);
    const owner2 = await mortgage.ownerMap(document,1);
 
    assert(owner === accounts[0]);
    assert(owner2 === accounts[1]);
 
   });

   it('This person was successfully verified as the 2nd owner of this mortgage document', async () => {
    const document = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  
 
    await mortgage.addData(document, {from:accounts[0]});
    await mortgage.addData(document, {from:accounts[1]});

    const owner = await mortgage.getOwnerByPosition(document,1);
 
    assert(owner === accounts[1]);
  });

  it("The owner counts were successfully verified", async () => {
    
    const document1 = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  
    const document2 = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01faa";  // note: it is different from document1 above
    
    await mortgage.addData(document1, {from:accounts[0]});
    await mortgage.addData(document1, {from:accounts[1]});

    await mortgage.addData(document2, {from:accounts[0]});

    const ownerCount1 = await mortgage.getOwnerCount(document1);
    const ownerCount2 = await mortgage.getOwnerCount(document2);

    assert(ownerCount1.toNumber()  === 2);
    assert(ownerCount2.toNumber()  === 1);   

    for (i = 0; i < ownerCount1 ; i++) {
        //text += "The number is " + i + "<br>";
        var owner = await mortgage.ownerMap(document1,i);
        assert(owner === accounts[i]);
      }

    for (i = 0; i < ownerCount2 ; i++) {
        //text += "The number is " + i + "<br>";
        var owner = await mortgage.ownerMap(document2,i);
        assert(owner === accounts[i]);
    }

 
   });

   it("The mortgage counts were successfully verified", async () => {
    
    const document1 = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";  
    const document2 = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01faa";  // note: it is different from document1 above
    
    await mortgage.addData(document1, {from:accounts[0]});
    await mortgage.addData(document1, {from:accounts[1]});

    await mortgage.addData(document2, {from:accounts[0]});

    const mortgageCount1 = await mortgage.getMortgageCount(accounts[0]);
    const mortgageCount2 = await mortgage.getMortgageCount(accounts[1]);

    assert(mortgageCount1.toNumber()  === 2);
    assert(mortgageCount2.toNumber()  === 1);   

 
   });

});
