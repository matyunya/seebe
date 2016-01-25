require 'test_helper'

class CashboxesControllerTest < ActionController::TestCase
  setup do
    @cashbox = cashboxes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:cashboxes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create cashbox" do
    assert_difference('Cashbox.count') do
      post :create, cashbox: {  }
    end

    assert_redirected_to cashbox_path(assigns(:cashbox))
  end

  test "should show cashbox" do
    get :show, id: @cashbox
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @cashbox
    assert_response :success
  end

  test "should update cashbox" do
    patch :update, id: @cashbox, cashbox: {  }
    assert_redirected_to cashbox_path(assigns(:cashbox))
  end

  test "should destroy cashbox" do
    assert_difference('Cashbox.count', -1) do
      delete :destroy, id: @cashbox
    end

    assert_redirected_to cashboxes_path
  end
end
