const {pool,prisma} = require('../config/db');

module.exports = {

    getAllCandidat : async(req,res)=> {

        try {
          const candidats = await prisma.candidat.findMany();
            //const result = await pool.query('SELECT * FROM candidat');
            res.json(candidats);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }

    },

    getCandidatById :  async (req, res) => {
        try {
          const { id } = req.params;
          const candidat = await prisma.candidat.findUnique({
            where : {id : parseInt(id)}
          })
          if (!candidat) {
            return res.status(404).json({ error: 'Candidat non trouvé' });
          }
          res.json(candidat);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

    createCandidat :async (req, res) => {
        try {
          const { prenom, nom, email, telephone, resume } = req.body;

          const candidat = await prisma.candidat.create({

            data : {
              prenom, 
              nom, 
              email, 
              telephone, 
              resume
            }
          })
          res.status(201).json(candidat);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      
      updateCandidat : async (req, res) => {
        try {
          const { id } = req.params;
          const { prenom, nom, email, telephone, resume } = req.body;
          const updatedCandidat = await prisma.candidat.update({

            where : {id : parseInt(id)},
            data : {
              prenom, 
              nom, 
              email, 
              telephone, 
              resume
            }
          })
          res.json(updatedCandidat);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

      deleteCandidat : async (req, res) => {
        try {
          const { id } = req.params;
      
          await prisma.candidat.delete({
            where: { id: parseInt(id) },
          });
      
          res.status(204).send();
        } catch (error) {
          if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Candidat non trouvé' });
          }
          res.status(500).json({ error: error.message });
        }
      }

}