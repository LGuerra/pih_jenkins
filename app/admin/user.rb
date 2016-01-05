ActiveAdmin.register User do
  permit_params [:email, :password, :password_confirmation,
                 :name, :last_name, :phone, :area, :puesto, group_ids: []]

  filter :email
  filter :last_name
  filter :name
  filter :area
  filter :puesto

  form do |f|
    f.inputs "User" do
      unless params[:reset_password] == 'yes'
        f.input :email
        if f.object.new_record?
          f.input :password, label: 'Contraseña'
          f.input :password_confirmation, label: 'Confirmar'
        end
        f.input :name, label: 'Nombre'
        f.input :last_name, label: 'Apellido'
        f.input :phone, label: 'Teléfono'
        f.input :area, label: 'Área'
        f.input :puesto
        f.input :groups, as: :check_boxes, label: 'Grupos'
      else
        f.input :password, label: 'Contraseña'
        f.input :password_confirmation, label: 'Confirmar'
      end
    end
    f.actions
  end

  index do
    column :email
    column 'Apellido', :last_name
    column 'Nombre', :name
    column :puesto
    column 'Área', :area
    column 'Teléfono', :phone
    column 'Sign-ins', :sign_in_count
    column 'Última IP', :last_sign_in_ip
    column 'Actual IP', :current_sign_in_ip
    column 'Grupos' do |user|
      user.groups.map(&:name).join(', ')
    end
    column 'Estado' do |user|
      if user.access_locked?
        status_tag 'locked', :error
      else
        status_tag 'unlocked', :ok
      end
    end
    column 'Modificar Estado' do |user|
      if user.access_locked?
        link_to 'Desbloquear', unlock_admin_user_path(user), method: :put
      else
        link_to 'Bloquear', lock_admin_user_path(user), method: :put
      end
    end
    column 'Cambiar password' do |user|
      link_to 'Cambiar', edit_admin_user_path(user, :reset_password => 'yes')
    end
    actions
  end

  show do
    attributes_table do
      row :email
      row :last_name
      row :name
      row :puesto
      row :area
      row :phone
      row :sign_in_count
      row :last_sign_in_ip
      row :current_sign_in_ip
=begin
      table_for user.tours do |s|
        column :id
        column :name
        column "Completado" do |t|
          if (Touruser.find_by(user_id: user.id, tour_id: t)).complete
            status_tag 'completo', :ok
          else
            status_tag 'incompleto', :error
          end
        end
        column "Modificar Estado del Tour" do |t|
          if (Touruser.find_by(user_id: user.id, tour_id: t.id)).complete
            link_to 'Reiniciar', completar_admin_user_path(user_id: user.id, tour_id: t.id), method: :put
          else
            link_to 'Completar', completar_admin_user_path(user_id: user.id, tour_id: t.id), method: :put
          end
        end
        column "Eliminar" do |t|
          link_to 'Eliminar Tour para este usuario', del_admin_user_path(user_id: user.id, tour_id: t.id), method: :delete
        end
      end
=end
    end
  end

=begin
  member_action :completar, method: :put do
    a = (Touruser.find_by(user_id: params[:user_id], tour_id: params[:tour_id]))
    a.complete = !a.complete
    a.save
    redirect_to admin_user_path(params[:user_id])
  end

  member_action :del, method: :delete do
    (Touruser.find_by(user_id: params[:user_id], tour_id: params[:tour_id])).destroy
    redirect_to admin_user_path(params[:user_id])
  end
=end

  member_action :unlock, method: :put do
    resource.unlock_access!
    redirect_to resource_path, notice: 'Desbloqueado'
  end
  member_action :lock, method: :put do
    resource.lock_access!
    redirect_to resource_path, notice: 'Usuario Bloqueado'
  end

end
