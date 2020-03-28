// importa a conexão
const connection = require('../database/connection');

module.exports = {

  async index(request, response) {
    const { page = 1 } = request.query;
    
    // [count] pega a posição zero == count[0]
    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5) // quantos registros vai pular  
      .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email' , 
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf' 
      ]);

    // retorna o total de registros no Header da requisição
    response.header('X-Total-Count', count['count(*)'])
    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    // ID da ONG vem pelo Header da Requisição
    const ong_id = request.headers.authorization;

    // Seta a variavel Id com o Id da posição 0 do array que resultou do insert
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    })
  
    return response.json({ id });
  },
  
  async delete(request, response) {
    const { id } = request.params; 
    // ID da ONG vem pelo Header da Requisição
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();
      
    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();
    
    return response.status(204).send();
  } 
}