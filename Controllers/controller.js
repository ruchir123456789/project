import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getalldata = async (req, res) => {
  const data = await prisma.dogdata.findMany();
  if (!data) {
    return res.status(500).send({
      message: "data not fetched",
    });
  }

  // res.send(data);
  res.render("userdata", { data });
  console.log(req.user);
};

const getdatabyid = async (req, res) => {
  const userid = req.params.id;
  if (!userid) {
    return res.status(500).send({ message: "user id not recived" });
  }

  const data = await prisma.dogdata.findUnique({
    where: { id: Number(userid) },
  });

  if (!data) {
    res.status(500).send({ message: "datafor the id not recived" });
  }

  res.status(400).send({
    data,
    userid,
  });
};

const createdata = async (req, res) => {
  // const createdata
  const { name, type, breed, age, color, country } = req.body;
  if (!name || !type || !breed || !age || !color || !country) {
    return res.status(500).send({ message: "data not found" });
  }
  // console.log(name);
  const data = await prisma.dogdata.create({
    data: {
      name,
      type,
      breed,
      age,
      color,
      country,
      email : req.user.email
    },
  });

  if (!data) {
    return res
      .status(500)
      .send({ message: "data not found in pet create API      " });
  }
  // console.log(data);
console.log(req.user);
  res.status(200).send({
    message: "data created",
    data,
  });
};

const updatedata = async (req, res) => {
  const userid = req.params.id;
  if (!userid) {
    return res.status(500).send({
      message: "id not recived",
    });
  }

  const { name, type, breed, age, color, country } = req.body;
  if (!name || !type || !breed || !age || !color || !country) {
    return res.status(500).send({
      message: "data not recived for update ",
    });
  }

  const data = await prisma.dogdata.update({
    data: { name, type, breed, age, color, country },
    where: { id: Number(userid) },
  });

  if (!data) {
    return res.status(500).send({
      message: "ERROR in update API so not updated",
    });
  }

  // res.redirect
  // res.render("updatenewpet",{data})

  // res.status(200).send({
  //   message: "user updated ",
  //   id: id,
  //   data: data,
  // });
  res.status(200).send({
    message : "user updated ",
    data
  })
};

const deletedata = async (req, res) => {
  const userid = req.params.id;

  if (!userid) {
    return res.status(200).send({
      message: "id not retrived Not",
    });
  }

  const data = await prisma.dogdata.delete({
    where: { id: Number(userid) },
  });

  if (!data) {
    return res.status(500).send({
      message: "user data not deleted in delete API",
    });
  }

  res.status(200).send({
    message: "user deleted ",
    id: userid,
  });
};

export { getalldata, getdatabyid, createdata, updatedata, deletedata };
